export default (timeerN) => {
  return `void timer0() {
    ${timeerN}
    TCCR0A = 
    (1 << COM0A1) | // 7
    (1 << COM0A0) | // 6
    (1 << COM0B1) | // 5
    (1 << COM0B0) | // 4, nothing in 3 and 2
    (1 << WGM01) |  // 1
    (1 << WGM00);   // 0

    TCCR0B = 
    (1 << FOC0A) |  // 7
    (1 << FOC0B) |  // 6
    (1 << WGM02) |  // 3
    (1 << CS02) |   // 2
    (1 << CS01) |   // 1
    (1 << CS00);    // 0
  }

  void timer1() {
    TCCR1A = 
    (1 << COM1A1) | // 7
    (1 << COM1A0) | // 6
    (1 << COM1B1) | // 5
    (1 << COM1B0) | // 4, nothing in 3 and 2
    (1 << WGM11) |  // 1
    (1 << WGM10);   // 0

    TCCR1B = 
    (1 << ICNC1) |  // 7
    (1 << ICES1) |  // 6
    (1 << WGM13) |  // 4, nothing in 5
    (1 << WGM12) |  // 3
    (1 << CS12) |   // 2
    (1 << CS11) |   // 1
    (1 << CS10);    // 0
  }
`;
}