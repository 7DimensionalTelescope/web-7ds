import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ScienceTopic, { topicMeta } from '../components/sciencetopic';

export const meta: MetaFunction = () => topicMeta('mma');

const Index = () => <ScienceTopic id="mma" />;

export default Index;
