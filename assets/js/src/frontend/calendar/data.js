import dateFns from 'date-fns';
import range from'lodash/range';

/**
 * Function handles gathering all the date we need to run the calendar. It determines,
 * the current year, current month, and date for every month based on the current year.
 * @param  {object} date Javascript Date Object
 * @return {object}   An Object containing all the data needed to run the calendar.
 */
export const getCalendarInfo = ( date ) => {
  const year = dateFns.getYear( date );
  const month = dateFns.getMonth( date );

  return {
    months : getMonths( year ),
    year: year,
    month: month
  }
}

/**
 * Function handles getting all the data need for a specific month. Since each
 * month view in the calendar can have dates from the prvious and next month
 * visible too, we need to know things about those months in addition to the
 * current month.
 *
 * @param  {object} date A Javascript Date Object
 * @return {object}    An object contain date specific to a certain month in
 * a certain year.
 */
const getMonth = ( date ) => {
  const month = dateFns.getMonth( date );
  const previousDays = dateFns.getDay( dateFns.startOfMonth( date ) );
  const total = dateFns.getDaysInMonth( date );
  const nextDays = getAppendNumbers( total, previousDays )

  return {
    month: month,
    name: getMonthName( month ),
    totalDays: total,
    nextDays: nextDays,
    previousDays: previousDays,
    total: total + nextDays + previousDays
  };
}

/**
 * Function creates a Javascript Date object for each month in a year. It then
 * passes that date to getMonth. This function essentially builds us an array
 * of all the months in a given year.
 * @param  {int|string} year The year you need month data for.
 * @return {array}    An array of month object containing data from call getMonth()
 */
const getMonths = ( year ) => {
  return range( 0, 11 ).map( (index) => getMonth( new Date( year, index ) ) );
}

/**
 * Function handles figuring out how my days are in a specific month..
 * @param  {int} month The month as a number. i.e if you want April then pass it a 4.
 * @return {int}      The number of days in the input month.
 */
const getBeforeNumbers = ( month ) => {
  return dateFns.getDaysInMonth( month - 1 );
}

/**
 * Function handles figuring out how many dates from the next month to show. This
 * is neccessary since some dates form the next month might be visible.
 * @param  {int} totalDays    Number of days in the current month.
 * @param  {int} previousDays Number of days in the previous month.
 * @return {int}              The number of next month days to show.
 */
const getAppendNumbers = ( totalDays, previousDays ) => {
  return 7 - ( ( totalDays + previousDays ) % 7 )
}

/**
 * Helpers function used to convert a month number into is string version. For example
 * passing the function 2 would return march.
 * @param  {int} monthNum The month as a number you wish to convert.
 * @return {string}          The Month's name as a string.
 */
const getMonthName = ( monthNum ) => {
  const months = [ 'january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
  return months[ monthNum ];
}

/**
 * Function returns an array of numbers that represent each day in the previous Month.
 * This will be used by the current month when showing previous dates that overlap into
 * its view.
 * @param  {object} currentMonth  The current month's date as returned by getMonth()
 * @param  {objct} previousMonth The previous month's date as returned by getMonth()
 * @return {array}               An array of numbers. [1,2,3,4,...]
 */
const getPreviousDates = ( currentMonth, previousMonth ) => {
  return range( previousMonth.totalDays - currentMonth.previousDays + 1, previousMonth.totalDays + 1 );
}

/**
 * Function will create an array of numbers which represent the dates in the current month.
 * @param  {object} currentMonth The current month's date as returned by getMonth()
 * @return {array}              An array of numbers. [1,2,3,4,...]
 */
const getCurrentDates = ( currentMonth ) => {
  return range( 1, currentMonth.totalDays + 1 )
}

/**
 * Function will create array of number which represent days in the next Month.
 * This will be used by the current month when showing previous dates that overlap into
 * its view.
 * @param  {object} currentMonth The current month's date as returned by getMonth()
 * @return {array}              An array of numbers. [1,2,3,4,...]
 */
const getNextDates = ( currentMonth ) => {
  return range( 1, currentMonth.nextDays + 1);
}

/**
 * Function takes the date arrays returned by getPreviousDates, getCurrentDates,
 * getNextDates, and combines them in that order. So previous dates come first,
 * and next dates come last. i.e [ 30, 31, 1, 2, .... 30, 1, 2, 3 ]
 * @param  {object} currentMonth  The current month's date as returned by getMonth()
 * @param  {object} previousMonth The preioous month's date as returned by getMonth()
 * @return {array}               A combined array of dates. i.e [ 30, 31, 1, 2, .... 30, 1, 2, 3 ]
 */
export const getCalendarDates = ( currentMonth, previousMonth ) => {
  return getPreviousDates( currentMonth, previousMonth )
          .concat( getCurrentDates( currentMonth ) )
          .concat( getNextDates( currentMonth ) );
}
