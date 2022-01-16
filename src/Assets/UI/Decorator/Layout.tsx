import React from 'react'
import Header from './Header'

interface Props {
    component: React.FC
}

const Layout = ({ component: Component }: Props) => {
    return (
        <React.Fragment>
            <Header />
            <Component />
        </React.Fragment>
    )
}

export default Layout
