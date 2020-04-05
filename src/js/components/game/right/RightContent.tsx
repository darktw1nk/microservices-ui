import React from 'react';
import {RootStoreType} from "../../../model/store/RootStore";
import "../../../../css/RightScreen.css";
import {Box, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import CompanyStatistics from "./CompanyStatistics";
import ProjectStatistics from "./ProjectStatistics";

interface Props {
    store: RootStoreType
}

interface TabPanelProps {
    children: any,
    value: number,
    index: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function RightContent(props: Props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue:number) => {
        setValue(newValue);
    };

    function a11yProps(index:number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div className="right-container">
            <Paper className="statistic-container">
                <Tabs value={value} onChange={handleChange} aria-label="statistics" centered>
                    <Tab label="Company Statistics" {...a11yProps(0)} />
                    <Tab label="Project Statistics" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CompanyStatistics store={props.store}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ProjectStatistics store={props.store}/>
                </TabPanel>
            </Paper>
        </div>
    );
}

export default RightContent;