import React from "react";
import PageContainer from "./PageContainer";
// import OrderItem from "../components/AdministratopPanel/OrderItem";
import AdministratorOrdersPanel from "../components/AdministratopPanel/AdministratorPanel";
// import OrderItem from "../components/AdministratopPanel/OrderItem";
const AdministratorPanel = props => {
    return (
        <PageContainer>
            <AdministratorOrdersPanel url={props} />
            {/*<OrderItem />*/}
        </PageContainer>
    );
};

export default AdministratorPanel;
