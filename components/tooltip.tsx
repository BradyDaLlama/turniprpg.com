import { Tooltip, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

// children to be content, note to be tooltip/popover content
export default function TooltipComponent({ children, note }: { children: React.ReactNode; note: string }) {
    const hasMouse = matchMedia('(pointer:fine)').matches;

    let tooltip = (
        <Tooltip showArrow={true} color="primary" closeDelay={100} content={note}>
            {children}
        </Tooltip>
    );
    if (!hasMouse) {
        tooltip = (
            <Popover color="primary" placement="top" showArrow={true}>
                <PopoverTrigger>{children}</PopoverTrigger>
                <PopoverContent>{note}</PopoverContent>
            </Popover>
        );
    }
    return tooltip;
}
