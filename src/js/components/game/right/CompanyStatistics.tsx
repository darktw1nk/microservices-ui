import React from 'react';
import {observer} from "mobx-react";
import "../../../../css/MainContent.css";
import {RootStoreType} from "../../../model/store/RootStore";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
interface Props {
    store: RootStoreType
}

function CompanyStatistics(props: Props) {

    const rows = props.store.statistics.companiesStats.map(companyStat =>
        <TableRow key={companyStat.name}>
            <TableCell>
                {companyStat.name}
            </TableCell>
            <TableCell>
                {companyStat.workers}
            </TableCell>
            <TableCell>
                {companyStat.money}
            </TableCell>
        </TableRow>
    );

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company name</TableCell>
                            <TableCell>Workers</TableCell>
                            <TableCell>Money</TableCell>
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

export default observer(CompanyStatistics);