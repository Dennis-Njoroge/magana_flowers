
export async function getServerSideProps(context) {
    const shouldRedirect = true;
    if (shouldRedirect) {
        // Redirect to a different page
        return {
            redirect: {
                destination: '/auth/login',
                permanent: true,
            },
        };
    }
    return {
        props: {},
    };
}

function LandingPage(props) {
    // Your page component JSX
}

export default LandingPage;