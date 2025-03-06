import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  margin: '0 auto',
  padding: '8px',
});

export const videoWrapper = style({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%',
});

export const video = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});
