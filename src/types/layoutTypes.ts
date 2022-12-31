import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export interface BaseLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

export type NextPageWithLayout = NextPage & {
    Layout?: (page: any) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
