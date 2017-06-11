/**
 * Function create a select option HTML element for the input year. Function
 * also handles setting a year as selected if that year matches the current year.
 * @param  {int} year        The year we need to build.
 * @param  {int} currentYear The current Year.
 * @return {string}             Option HTML markup as a string.
 */
export function yearOptionTemplate( year, currentYear ) {

  if ( year === currentYear ) {
    return `<option value="${year}" selected="selected">${year}</option>`;
  } else {
    return `<option value="${year}">${year}</option>`;
  }
}

/**
 * Function handles building the HTML markup for a single date in the calendar view.
 * @param  {string} month    The month name
 * @param  {string|int} day      The date.
 * @param  {string} inactive To make a date as a date from the previous or next month
 * same the string of "gray"
 * @return {string}          Date HTML markup as a string.
 */
export function monthDayTemplate( month, day, inactive ) {
  return `<input type="radio" id="calendar-${month}-${day}" name="calendar-date" value="${day}">
  <label for="calendar-${month}-${day}" class="${inactive}">${day}</label>`;
}
