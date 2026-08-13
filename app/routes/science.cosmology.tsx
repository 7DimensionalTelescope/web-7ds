import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ScienceTopic, { topicMeta } from '../components/sciencetopic';

export const meta: MetaFunction = () => topicMeta('cosmology');

const Index = () => <ScienceTopic id="cosmology" />;

export default Index;
