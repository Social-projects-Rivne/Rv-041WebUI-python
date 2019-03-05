import React from "react";
import PageContainer from "./PageContainer";
import AdministratorOrdersPanel from "../components/AdministratopPanel/AdministratorPanel";
const AdministratorPanel = props => {
    return (
        <PageContainer>
            <AdministratorOrdersPanel url={props} />
        </PageContainer>
    );
};

export default AdministratorPanel;
