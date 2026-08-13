import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ScienceTopic, { topicMeta } from '../components/sciencetopic';

export const meta: MetaFunction = () => topicMeta('galactic');

const Index = () => <ScienceTopic id="galactic" />;

export default Index;
