import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import CalculatorPage, { calculatorMeta } from '../components/calculatorpage';

export const meta: MetaFunction = () => calculatorMeta('tiles');

const Index = () => <CalculatorPage slug="tiles" />;

export default Index;
