import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ScienceTopic, { topicMeta } from '../components/sciencetopic';

export const meta: MetaFunction = () => topicMeta('agn');

const Index = () => <ScienceTopic id="agn" />;

export default Index;
