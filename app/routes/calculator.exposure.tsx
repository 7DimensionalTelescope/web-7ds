import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import CalculatorPage, { calculatorMeta } from '../components/calculatorpage';

export const meta: MetaFunction = () => calculatorMeta('exposure');

const Index = () => <CalculatorPage slug="exposure" />;

export default Index;
