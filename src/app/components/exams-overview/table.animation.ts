import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

export const tableAnimation = trigger('tableAnimation', [
  transition('void => *', [
    style({ height: '*', opacity: '0'}),
    sequence([
      animate('.5s ease', style({ height: '*', opacity: 1})),
    ]),
  ]),
]);
