import React from 'react';

const icon = (props) => {

  switch(props.name) {
    case 'magnify':
      return (
        <svg className={props.className} style={{width: props.width, height: props.height}} viewBox="0 0 22 22">
          <path fill={props.color} stroke="none" 
             d="M 9 3 C 5.6759952 3 3 5.6759952 3 9 C 3 12.324005 5.6759952 15 9 15 C 10.481205 15 11.830584 14.465318 12.875 13.582031 L 18.292969 19 L 19 18.292969 L 13.582031 12.875 C 14.465318 11.830584 15 10.481205 15 9 C 15 5.6759952 12.324005 3 9 3 z M 9 4 C 11.770005 4 14 6.2299952 14 9 C 14 11.770005 11.770005 14 9 14 C 6.2299952 14 4 11.770005 4 9 C 4 6.2299952 6.2299952 4 9 4 z " />  
        </svg>
      );
     
    case 'account':
      return (
        <svg className={props.className} style={{width: props.width, height: props.height}} viewBox="0 0 24 24">
        <path fill={props.color} d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
      );

    case 'map-marker':
      return (
        <svg className={props.className} style={{width: props.width, height: props.height}} viewBox="0 0 24 24">
          <path fill={props.color} d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
        </svg>
      );

    case 'heart':
      return (
        <svg className={props.className} style={{width: props.width, height: props.height}} viewBox="0 0 24 24">
          <path fill={props.color} d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
      );

    case 'information':
      return (
        <svg className={props.className} style={{width: props.width, height: props.height}} viewBox="0 0 24 24">
          <path fill={props.color} d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
      )
      
    default:
      return (
        <span>unknown icon</span>
      );
      
  }

  
}

export default icon;