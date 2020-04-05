import React from 'react';
import {observer} from "mobx-react";
import "../../../../css/MainContent.css";
import {RootStoreType} from "../../../model/store/RootStore";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
interface Props {
    store: RootStoreType
}

function ProjectStatistics(props: Props) {

    const rows = props.store.statistics.projectsStats.map(companyStat =>
        <TableRow key={companyStat.name}>
            <TableCell>
                {companyStat.name}
            </TableCell>
            <TableCell>
                {companyStat.companyName}
            </TableCell>
            <TableCell>
                {companyStat.revenue}
            </TableCell>
        </TableRow>
    );

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project name</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Revenue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default observer(ProjectStatistics);