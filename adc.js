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
