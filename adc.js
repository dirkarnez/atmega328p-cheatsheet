// https://youtu.be/E_kqCCLsvFs?list=PLlpWU0XxPDVg1T4XCsGebXx7GRPD-5Nmj&t=5433
void adc_init()
{
	// ADMUX = 0b01000000;
	// ADCSRA |= (1 << ADEN) | (0 << ADPS2) | (1 << ADPS1) | (0 << ADPS0);
	ADMUX = 
	(1 << REFS1 ) | // 7
	(1 << REFS0 ) | // 6
	(1 << ADLAR ) | // 5, nothing on 4
	(1 << MUX3 ) | // 3
	(1 << MUX2 ) | // 2
	(1 << MUX1 ) | // 1
	(1 << MUX0 ); // 0

	ADCSRA = 
	( 1 << ADEN  ) | // 7
	( 1 << ADSC  ) | // 6
	( 1 << ADATE ) | // 5
	( 1 << ADIF  ) | // 4
	( 1 << ADIE  ) | // 3
	( 1 << ADPS2 ) | // 2
	( 1 << ADPS1 ) | // 1
	( 1 << ADPS0 ); // 0
}

int adc_read(unsigned char channel)
{
	/* set input channel to read */
	ADMUX = 0x40 | (channel & 0x07); // 0100 0000 | (channel & 0000 0100)
	/* Start ADC conversion */
	ADCSRA |= (1 << ADSC);
	/* Wait until end of conversion by polling ADC interrupt flag */
	while (!(ADCSRA & (1 << ADIF)));
	ADCSRA |= (1 << ADIF);
  
	exhaustive_delay_ms(1);
  
	return ADCW;
}


#include <avr/io.h> //standard AVR header
int main (void)
{
DDRB = 0xFF; //make Port B an output
DDRD = 0xFF; //make Port D an output
DDRA = 0; //make Port A an input for ADC input
ADCSRA= 0x87; //make ADC enable and select ck/128
ADMUX= 0xC0; //2.56V Vref, ADC0 single ended input
//data will be right-justified
while (1){
ADCSRA|=(1<<ADSC); //start conversion
while((ADCSRA&(1<<ADIF))==0);//wait for conversion to finish
PORTD = ADCL; //give the low byte to PORTD
PORTB = ADCH; //give the high byte to PORTB
}
return 0;
}

#include <avr\io.h>
#include <avr\interrupt.h>
ISR(ADC_vect){
PORTD = ADCL; //give the low byte to PORTD
PORTB = ADCH; //give the high byte to PORTB
ADCSRA|=(1<<ADSC); //start conversion
}
int main (void){
DDRB = 0xFF; //make Port B an output
DDRD = 0xFF; //make Port D an output
DDRA = 0; //make Port A an input for ADC input
sei(); //enable interrupts
ADCSRA= 0x8F; //enable and interrupt select ck/128
ADMUX= 0xC0; //2.56V Vref and ADC0 single-ended
//input right-justified data
ADCSRA|=(1<<ADSC); //start conversion
while (1); //wait forever
return 0;
}
