export function ClientCountUp(props: Omit<CountUpProps, 'duration'>) {
    const [isInViewport, setIsInViewport] = useState(false);
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        if (componentRef.current) observer.observe(componentRef.current);

        return () => {
            if (componentRef.current) observer.unobserve(componentRef.current);
        };
    }, []);

    return (
        <span ref={componentRef} className={props.className || ''}>
            {isInViewport ? <CountUp {...props} className="" duration={4} /> : <>0</>}
        </span>
    );
}
