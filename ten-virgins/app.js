
function Bootstrap() {
    const { Button, Col, Container, Row } = ReactBootstrap;
    const [smartness, setSmartness] = React.useState(null);

    if (smartness === null) {
        return (
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3>Who would you like to be?</h3>
                        <Button variant="primary" size="lg" onClick={() => setSmartness(true)}>
                            Wise Virgin
                        </Button>
                        &nbsp; &nbsp;
                        <Button variant="danger" size="lg" onClick={() => setSmartness(false)}>
                            Not Wise Virgin
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return <App wise={ smartness } onReset={() => setSmartness(null)} />;
}

function App({ wise, onReset }) {
    React.useEffect(() => {
        document.body.classList.add("app-running");
        return () => document.body.classList.remove("app-running");
    }, []);

    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
        if (progress > 0) {
            let timer = setTimeout(() => setProgress(progress - 1), 100);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    const { Container, Col, Row, Button, Image, ProgressBar } = ReactBootstrap;

    let progressVariant = 'success';
    if (progress < 25)      progressVariant = 'danger';
    else if (progress < 50) progressVariant = 'warning';

    let imageOpacity = 1;
    if (progress === 0) imageOpacity = 0;
    else if (progress < 10) imageOpacity = .35;
    else if (progress < 25) imageOpacity = .50;
    else if (progress < 35) imageOpacity = .75;

    return (
        <Container>
            <Row>
                <Col xs={10}>
                    <ProgressBar now={progress} variant={progressVariant} />
                </Col>
                { wise && (
                    <Col xs={2}>
                        <Button size="sm" variant="outline-light" onClick={() => setProgress(Math.min(progress + 30, 100))}>Refill</Button>
                    </Col>
                )}
            </Row>
            <Row>
                <Col xs={12} className="text-center">
                    <Image src="https://media.giphy.com/media/l9o9zrJUPAcVO/giphy.gif" fluid  style={{ opacity: imageOpacity }} />
                </Col>
            </Row>
        </Container>
    );
}

ReactDOM.render(
    <Bootstrap />,
    document.getElementById('root')
);