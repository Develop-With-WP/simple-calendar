import { buildYearDropdown, updateCalendar } from './dom';

export default function() {
  const calendar = document.querySelector( '.calendar' );
  const today = new Date();

  if ( ! calendar ) {
    return false;
  }

  const monthDropdown = document.getElementById( 'calendar-top-month' );
  const yearDropdown = document.getElementById( 'calendar-top-year' );
  const leftArrow = calendar.querySelector( '.calendar-top-button.left' );
  const rightArrow = calendar.querySelector( '.calendar-top-button.right' );

  let info = updateCalendar( today );
  buildYearDropdown( today );

  monthDropdown.addEventListener( 'change', ( e ) => {
    info = updateCalendar( new Date( info.year, e.target.value ) );
  } );
  yearDropdown.addEventListener( 'change', ( e ) => {
    info = updateCalendar( new Date( e.target.value, info.month ) );
  } );

  leftArrow.addEventListener( 'click', ( e ) => {
    info = updateCalendar( new Date( info.year, info.month - 1 ) );
  } );

  rightArrow.addEventListener( 'click', ( e ) => {
    info = updateCalendar( new Date( info.year, info.month + 1 ) );
  } );
}
