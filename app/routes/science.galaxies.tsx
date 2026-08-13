import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ScienceTopic, { topicMeta } from '../components/sciencetopic';

export const meta: MetaFunction = () => topicMeta('galaxies');

const Index = () => <ScienceTopic id="galaxies" />;

export default Index;
