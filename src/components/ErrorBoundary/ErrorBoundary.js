import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false
        }
    }

    static getDerivedStateFromError (error) {
        return {
            hasError: true
        }
    }

    componentDidCatch (error, info) {
        console.log(error);
        console.log(info);
    }
    
    
    render() {
        const navigateHome = () => {
            window.location.replace('/dashboard')
        }

        if (this.state.hasError) {
            return (
                <div>
                    <div className='h-screen grid justify-center items-center'>
                        <div>
                            <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1681223576/BOG/connection-timeout-5732788-4812664_sblvkb.png' alt='error' className='w-10/12 lg:w-96 mx-auto'/>
                            <p className='text-center fw-600 text-xl lg:text-3xl mt-4'>Something went wrong</p>
                            <p className='mt-2 text-center'>Try refreshing the page or goto homepage</p>
                            <div className='mt-8 flex justify-center gap-x-6'>
                                <button className='btn-primary px-6 lg:px-12' onClick={() => window.location.reload(false)}>Refresh</button>
                                <button className='border-pri rounded px-3 lg:px-12 text-primary fw-500' onClick={navigateHome}>Goto Homepage</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary
