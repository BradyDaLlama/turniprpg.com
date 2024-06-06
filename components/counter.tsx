'use client';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function Counter({ value, className }: { value: number; className?: string }) {
    return <CountUp className={className} end={value} />;
}
