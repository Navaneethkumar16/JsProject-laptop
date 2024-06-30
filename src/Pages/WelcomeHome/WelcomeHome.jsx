import React from 'react'


function WelcomeHome() {
    return (
        <div>

            <div className="container">
                <header className="bg-primary text-white text-center py-4 " style={{ borderRadius: '20px' }}>
                    <h1>Welcome to Our Website!</h1>
                </header>

                <main className="my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4 mb-3 d-flex justify-content-center">
                            <img
                                src="src\MyImages\Keyframe Factory Motion Design.gif"
                                alt="Image 1"
                                className="img-fluid rounded"
                                style={{ width: '500px', height: '300px' }}
                            />
                        </div>
                    </div>
                </main>

                <footer className="bg-light text-dark py-4" style={{ borderRadius: '20px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 mb-3">
                                <h5>About Us</h5>
                                <p>Learn more about our company.</p>
                            </div>
                            <div className="col-md-2 mb-3">
                                <h5>Contact Us</h5>
                                <p>Get in touch with us.</p>
                            </div>
                            <div className="col-md-2 mb-3">
                                <h5>Information</h5>
                                <p>Useful information about our services.</p>
                            </div>
                            <div className="col-md-2 mb-3">
                                <h5>Policies</h5>
                                <p>Read our policies and terms.</p>
                            </div>
                            <div className="col-md-2 mb-3">
                                <h5>Need Help?</h5>
                                <p>Find help and support here.</p>
                            </div>
                            <div className="col-md-2 mb-3">
                                <h5>Follow Us</h5>
                                <div className="d-flex">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark me-2">
                                        <i className="fab fa-facebook fa-lg"></i>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark me-2">
                                        <i className="fab fa-instagram fa-lg"></i>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark me-2">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-dark me-2">
                                        <i className="fab fa-youtube fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <p>&copy; 2024 All Rights Reserved</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default WelcomeHome