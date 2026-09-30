import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import CalculatorPage, { calculatorMeta } from '../components/calculatorpage';

export const meta: MetaFunction = () => calculatorMeta('visibility');

const Index = () => <CalculatorPage slug="visibility" />;

export default Index;
