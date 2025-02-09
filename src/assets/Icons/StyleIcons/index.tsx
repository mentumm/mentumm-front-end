import React from 'react';
import { getStrokeColor, getFillColor } from './utils';

export const ShieldIcon = (props) => {
  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);

  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.75 8.59963L25.509 3.125L44.25 8.59963V19.8267C44.25 31.6273 36.6981 42.1036 25.5027 45.8339C14.3042 42.1036 6.75 31.625 6.75 19.8216V8.59963Z"
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FireworksIcon = (props) => {
  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);

  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.75 43.7501L15.7855 17.9834L32.7917 35.4568L6.75 43.7501Z" stroke={strokeColor} fill={fillColor} strokeWidth="5" strokeLinejoin="round" />
      <path d="M24.459 19.791L29.6673 14.5827C32.4451 11.8049 32.7923 9.37435 30.709 7.29102" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.709 26.041L35.9173 20.8327C39.3895 17.3605 42.8618 17.3605 46.334 20.8327" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.3333 7.29167C22.4839 7.29167 23.4167 6.35893 23.4167 5.20833C23.4167 4.05774 22.4839 3.125 21.3333 3.125C20.1827 3.125 19.25 4.05774 19.25 5.20833C19.25 6.35893 20.1827 7.29167 21.3333 7.29167Z" fill={strokeColor} />
      <path d="M44.2493 6.24967C45.3999 6.24967 46.3327 5.31693 46.3327 4.16634C46.3327 3.01575 45.3999 2.08301 44.2493 2.08301C43.0988 2.08301 42.166 3.01575 42.166 4.16634C42.166 5.31693 43.0988 6.24967 44.2493 6.24967Z" fill={strokeColor} />
      <path d="M44.2493 30.2077C45.3999 30.2077 46.3327 29.2749 46.3327 28.1243C46.3327 26.9738 45.3999 26.041 44.2493 26.041C43.0988 26.041 42.166 26.9738 42.166 28.1243C42.166 29.2749 43.0988 30.2077 44.2493 30.2077Z" fill={strokeColor} />
      <path d="M41.1243 39.5827C42.2749 39.5827 43.2077 38.6499 43.2077 37.4993C43.2077 36.3488 42.2749 35.416 41.1243 35.416C39.9738 35.416 39.041 36.3488 39.041 37.4993C39.041 38.6499 39.9738 39.5827 41.1243 39.5827Z" fill={strokeColor} />
    </svg>
  )
};

export const CrownIcon = (props) => {
  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);
  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M25.5003 45.8337C37.0063 45.8337 46.3337 36.5063 46.3337 25.0003C46.3337 13.4944 37.0063 4.16699 25.5003 4.16699C13.9944 4.16699 4.66699 13.4944 4.66699 25.0003C4.66699 36.5063 13.9944 45.8337 25.5003 45.8337Z" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.042 30.2083V19.7917L20.292 22.9167L25.5003 15.625L30.7087 22.9167L36.9587 19.7917V30.2083H14.042Z" fill={fillColor} stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const DroneIcon = (props) => {
  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);

  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.959 11.459L20.2923 19.7923M39.0423 38.5423L30.709 30.209" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39.0423 11.459L30.709 19.7923M11.959 38.5423L20.2923 30.209" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.292 19.792H30.7087V30.2087H20.292V19.792Z" stroke={strokeColor} strokeWidth="5" fill={fillColor} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39.042 18.7503C40.4842 18.7503 41.894 18.3227 43.093 17.5215C44.2921 16.7202 45.2267 15.5815 45.7787 14.2491C46.3305 12.9167 46.4749 11.4505 46.1936 10.0361C45.9122 8.62168 45.2177 7.32243 44.198 6.30268C43.1782 5.28292 41.879 4.58845 40.4645 4.30711C39.0501 4.02575 37.584 4.17015 36.2516 4.72204C34.9192 5.27393 33.7804 6.20852 32.9792 7.40763C32.1779 8.60673 31.7503 10.0165 31.7503 11.4587M39.042 31.2503C40.4842 31.2503 41.894 31.6779 43.093 32.4792C44.2921 33.2804 45.2267 34.4192 45.7787 35.7516C46.3305 37.084 46.4749 38.5501 46.1936 39.9645C45.9122 41.379 45.2177 42.6782 44.198 43.6979C43.1782 44.7177 41.879 45.4122 40.4645 45.6936C39.0501 45.9749 37.584 45.8305 36.2516 45.2787C34.9192 44.7267 33.7804 43.7921 32.9792 42.593C32.1779 41.394 31.7503 39.9842 31.7503 38.542M11.9587 18.7503C10.5165 18.7503 9.10674 18.3227 7.90763 17.5215C6.70852 16.7202 5.77393 15.5815 5.22204 14.2491C4.67015 12.9167 4.52575 11.4505 4.80711 10.0361C5.08845 8.62168 5.78292 7.32243 6.80268 6.30268C7.82243 5.28292 9.12168 4.58845 10.5361 4.30711C11.9505 4.02575 13.4167 4.17015 14.7491 4.72204C16.0815 5.27393 17.2202 6.20852 18.0215 7.40763C18.8227 8.60673 19.2503 10.0165 19.2503 11.4587M11.9587 31.2503C10.5165 31.2503 9.10674 31.6779 7.90763 32.4792C6.70852 33.2804 5.77393 34.4192 5.22204 35.7516C4.67015 37.084 4.52575 38.5501 4.80711 39.9645C5.08845 41.379 5.78292 42.6782 6.80268 43.6979C7.82243 44.7177 9.12168 45.4122 10.5361 45.6936C11.9505 45.9749 13.4167 45.8305 14.7491 45.2787C16.0815 44.7267 17.2202 43.7921 18.0215 42.593C18.8227 41.394 19.2503 39.9842 19.2503 38.542" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const SubsetIcon = (props) => {
  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);
  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.416 29.167V36.4587H18.7493" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.75 29.167H43.75V43.7503H18.75V36.4587V29.167Z" stroke={strokeColor} strokeWidth="5" fill={fillColor} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.25 14.0622V13.0205" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.25 20.8337V19.792" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.25 7.29167V6.25" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.334 14.0622V13.0205" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.334 20.8337V19.792" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.334 7.29167V6.25" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.3327 20.833H32.291" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.29167 20.833H6.25" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.29167 6.25H6.25" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5417 6.25H12.5" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.3132 6.25H19.2715" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.3132 20.833H19.2715" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.0827 6.25H26.041" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5417 20.833H12.5" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.0827 20.833H26.041" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.3327 6.25H32.291" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const AnchorIcon = (props) => {

  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);

  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.416 25H4.16602C4.16602 36.5059 13.4934 45.8333 24.9994 45.8333C36.5053 45.8333 45.8327 36.5059 45.8327 25H39.5827"
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 45.834V14.584"
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.9993 14.5837C27.8758 14.5837 30.2077 12.2518 30.2077 9.37533C30.2077 6.49885 27.8758 4.16699 24.9993 4.16699C22.1229 4.16699 19.791 6.49885 19.791 9.37533C19.791 12.2518 22.1229 14.5837 24.9993 14.5837Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};


export const BookIcon = (props) => {
  const strokeColor = getStrokeColor(props);
  const fillColor = getFillColor(props);

  return (
    <svg
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.25 38.5413C6.25 30.5171 6.25 11.458 6.25 11.458C6.25 8.00623 9.04822 5.20801 12.5 5.20801H37.5V32.2913C37.5 32.2913 17.9506 32.2913 12.5 32.2913C9.0625 32.2913 6.25 35.0874 6.25 38.5413Z" stroke={strokeColor} strokeWidth="5" fill={fillColor} strokeLinejoin="round" />
      <path d="M37.5 32.291C37.5 32.291 13.7018 32.291 12.5 32.291C9.04822 32.291 6.25 35.0892 6.25 38.541C6.25 41.9928 9.04822 44.791 12.5 44.791H43.75V7.29102" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.542 38.541H36.4587" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const StreetSignIcon = (props) => {
  return (
    <svg
      width="147"
      height="164"
      viewBox="0 0 147 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M82.5508 -3.75V155.812"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82.5508 13.5H131.623L142.214 30.75L131.623 48H82.5508V13.5Z"
        stroke="white"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M82.5508 73.875H15.4784L4.88806 91.125L15.4784 108.375H82.5508V73.875Z"
        stroke="white"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M58 160H108"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const SuccessIcon = (props) => {
  return (
    <svg width="111" height="110" viewBox="0 0 111 110" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.300781 0H110.301V110H0.300781V0Z" fill="white" fillOpacity="0.01" />
      <path d="M55.301 9.16602L67.3398 17.9478L82.2412 17.9194L86.819 32.1003L98.891 40.8362L94.2594 54.9993L98.891 69.1625L86.819 77.8984L82.2412 92.0792L67.3398 92.051L55.301 100.833L43.2622 92.051L28.3609 92.0792L23.783 77.8984L11.7109 69.1625L16.3427 54.9993L11.7109 40.8362L23.783 32.1003L28.3609 17.9194L43.2622 17.9478L55.301 9.16602Z" stroke="white" strokeOpacity="0.1" strokeWidth="9.85827" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39.2578 54.9993L50.7161 66.4577L73.6328 43.541" stroke="white" strokeOpacity="0.1" strokeWidth="9.85827" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const GamePS = (props) => {
  return (
    <svg width="81" height="146" viewBox="0 0 81 146" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g opacity="0.1">
        <path d="M0.164062 0.107422L115.838 0.107422V115.781H0.164062L0.164062 0.107422Z" fill="white" fillOpacity="0.01" />
        <path d="M16.957 60.9629H49.443V93.4489H16.957L16.957 60.9629Z" stroke="white" strokeWidth="8" strokeLinejoin="round" />
        <path d="M33.2 44.7204C42.1708 44.7204 49.443 37.4482 49.443 28.4774C49.443 19.5066 42.1708 12.2344 33.2 12.2344C24.2292 12.2344 16.957 19.5066 16.957 28.4774C16.957 37.4482 24.2292 44.7204 33.2 44.7204Z" stroke="white" strokeWidth="8" strokeLinejoin="round" />
        <path d="M17.1055 109.514L49.5915 142" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49.5915 109.514L17.1055 142" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>

  )
}