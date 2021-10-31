import { React, useState } from "react";
import { 
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CNavItem,
    CNavbarNav,
    CNavLink,
    CCollapse } from '@coreui/react';

export const Header = () => {
    const [visible, setVisible] = useState(false);
    return (
        <CNavbar expand="lg" colorScheme="light" colorScheme="dark" className="bg-dark">
            <CContainer fluid>
            <CNavbarBrand href={"/shipments"}>Shipments</CNavbarBrand>
            <CNavbarToggler
                aria-label="Toggle navigation"
                aria-expanded={visible}
                onClick={() => setVisible(!visible)}
            />
            <CCollapse className="navbar-collapse" visible={visible}>
                <CNavbarNav className="me-auto mb-2 mb-lg-0">
                <CNavItem>
                    <CNavLink href={"/shipments"}>
                    Shipments list
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href={"/add"}>
                    Add new shipment
                    </CNavLink>
                </CNavItem>
                </CNavbarNav>
            </CCollapse>
            </CContainer>
        </CNavbar>
    )
};