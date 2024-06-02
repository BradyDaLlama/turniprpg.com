import { Tooltip, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';

import useLargeScreen from '@/components/hooks/useLargeScreen';

// children to be content, note to be tooltip/popover content
export default function TooltipComponent({ children, note }: { children: React.ReactNode; note: string }) {
    const isLargeScreen = useLargeScreen();

    let tooltip = (
        <Tooltip showArrow={true} color="primary" closeDelay={100} content={note}>
            {children}
        </Tooltip>
    );
    if (!isLargeScreen) {
        tooltip = (
            <Popover color="primary" placement="top" showArrow={true}>
                <PopoverTrigger>{children}</PopoverTrigger>
                <PopoverContent>{note}</PopoverContent>
            </Popover>
        );
    }
    return tooltip;
}
