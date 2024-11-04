void adc_init()
{
	ADMUX = 0b01000000;
	ADCSRA |= (1 << ADEN) | (0 << ADPS2) | (1 << ADPS1) | (0 << ADPS0);
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
