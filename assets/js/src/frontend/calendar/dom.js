import dateFns from 'date-fns';
import range from'lodash/range';
import { yearOptionTemplate, monthDayTemplate } from './templates';
import { getCalendarDates, getCalendarInfo } from './data';

/**
 * Function manipulates the DOM to  build the year dropdown. Function will
 * create a year for every year between 1970 and 2030.
 * @param  {object} date A Valid Javascript Date Object.
 * @return {void} Function accesses the DOM and contains side effects.
 */
export const buildYearDropdown = ( date ) => {
  const years = range( 1970, 2030 );
  const currentYear = dateFns.getYear( date );
  const yearsSelect = document.getElementById( 'calendar-top-year' );

  if ( ! yearsSelect ) {
    return false;
  }

  const yearHTML = years.reduce( ( acc, year ) => {
    return acc.concat( yearOptionTemplate( year, currentYear ) );
  }, '' );

  const frag = document.createRange().createContextualFragment( yearHTML );
  yearsSelect.appendChild( frag );
}

/**
 * Function accesses the DOM to update the value of a HTML5 select. Function expects
 * the new value as well as the element ID you widh to update.
 * @param  {string} dropdownID DOM Element ID
 * @param  {int|string} value  The option value
 * @return {void} Function accesses the DOM and contains side effects.
 */
export const updateDropDown = ( dropdownID, value ) => {
  const select = document.getElementById( dropdownID );

  if ( ! select ) {
    return false;
  }

  select.value = value;
}

/**
 * Function handles getting the dates needed to build out the calendar. It will
 * determine the days from the previous, current, and next month which need
 * to be shown for the current month. Once it has the days, this function will
 * also manipulate the DOM to inject those dates into the calendar body.
 *
 * @param  {object}   current  Data returned by getMonth() for the current month.
 * @param  {object}   previous Data returned by getMonth() for the previous month.
 * @param  {object}   next     Data returned by getMonth() for the next month.
 * @return {void} Function accesses the DOM and contains side effects.
 */
export const buildMonthCalendar = ( current, previous, next ) => {
  const monthBody = document.querySelector( '.calendar-body-dates' );

  if ( ! monthBody ) {
    return false;
  }

  /**
   * Gets the dates.
   */
  const dates = getCalendarDates( current, previous );

  /**
   * Loops through the dates and creates the HTML markup for each date.
   * Return the combine HTML markup as one long string.
   */
  const markup = dates.reduce( ( acc, date, index ) => {
    if ( index <= current.previousDays - 1 ) {
      return acc.concat( monthDayTemplate( previous.name, date, 'gray' ) );
    }

    if ( index > current.previousDays + current.totalDays - 1 ) {
      return acc.concat( monthDayTemplate( next.name, date, 'gray' ) );
    }

    return acc.concat( monthDayTemplate( current.name, date, '' ) );

  }, '' );

  /**
   * Converts the HTML string into a DOM Node, create the existing calendar body
   * data, appends the new DOM node to the calendar body.
   */
  const frag = document.createRange().createContextualFragment( markup );
  monthBody.innerHTML = '';
  monthBody.appendChild( frag );
}

/**
 * Function handles calling various function to update the calendar body, as well
 * as the two dropdowns based on the new calendar data. This provides a single point
 * from which we can update all the things by simply passing it new data.
 *
 * @param {object} info The new data returned by calling getCalendarInfo()
 */
const setCalendarContext = ( info ) => {
  updateDropDown( 'calendar-top-month', info.month );
  updateDropDown( 'calendar-top-year', info.year );
  buildMonthCalendar( info.months[ info.month ], info.months[ info.month - 1 ],  info.months[ info.month + 1 ] );
}

/**
 * Function is a wrapper around setCalendarContext() and getCalendarInfo(). this
 * is simply a convenience function used by all the calendar event listeners to
 * bootstrap updating the calendar.
 *
 * @param  {string|int|object}  year The year the calendar should be set to or a Javascript Date Object.
 * @param  {string|int|Boolean} month (option) If year is a JS Date then this arg is not needed. Otherwise
 * it should be the month number the calendar should be set to.
 * @return {object}  returns the new Calendar data after changing the date.
 */
export const updateCalendar = ( year, month = false ) => {
  const date = ! month ? year : new Date( year, month )
  const info = getCalendarInfo( date );
  setCalendarContext( info );
  return info;
}
