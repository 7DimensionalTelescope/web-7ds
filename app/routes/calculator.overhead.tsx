import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import CalculatorPage, { calculatorMeta } from '../components/calculatorpage';

export const meta: MetaFunction = () => calculatorMeta('overhead');

const Index = () => <CalculatorPage slug="overhead" />;

export default Index;
