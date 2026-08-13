import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ScienceTopic, { topicMeta } from '../components/sciencetopic';

export const meta: MetaFunction = () => topicMeta('transients');

const Index = () => <ScienceTopic id="transients" />;

export default Index;
