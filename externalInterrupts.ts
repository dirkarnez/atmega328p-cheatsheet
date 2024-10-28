export default `
#include <avr/io.h>
#include <avr/interrupt.h>

#define F_CPU 16000000UL

int main(void)
{
    // DDRD = 0xFF & ~(1 << 2); // 4th must be 0 for input;
	DDRC = 0xFF;
    PORTC = 0;

    EIMSK = (1 << INT0);
    EICRA = 
    (1 << ISC01) | // 1
    (1 << ISC00); // 0
    
    // EIMSK |= (1 << INT1);
    // EICRA |= 
    // (1 << ISC11) | // 3
    // (1 << ISC10); // 2

    sei();

    while (1);
}

ISR(INT0_vect) {
    PORTC ^= (1 << 0);
}
`
