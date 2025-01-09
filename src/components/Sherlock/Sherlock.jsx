import { Box, Button, styled } from '@mui/material';
import { useCallback, useState } from 'react';
import { Wrapper } from './Styles';
import { ArrowIcon, CopyIcon } from '../../assets/Icons/SvgIcon';
import ArrowRightIcon from "../../assets/Icons/ArrowRightIcon";
const Sherlock = ({ children, trigger }) => {

    const userData = [
        { id: 1, status: 'Name', value: 'Sherlock Nodes' },
        { id: 2, status: 'Status', value: 'Inactive' },
        { id: 3, status: 'Commission Rate', value: '0.1%' },
        { id: 4, status: 'Commission Max Rate', value: '0.1%' },
        { id: 5, status: 'Commission Change Rate', value: '0.1%' },
        { id: 6, status: 'Total Stake', value: '115047575.57773563 TICS' }
    ];
    return (
        <>
            <Wrapper>
                <div className='arrow_container' style={{ cursor: "pointer" }}>
                    <ArrowIcon />
                    <h3>Validators</h3>
                </div>
                <div className='namesherlock'>
                    <p>Name</p>
                    <p>Sherlock Nodes</p>
                </div>
                <div className='flex-itemssheloc'>
                    <div className='address_container'>
                        <p>Wallet Address</p>
                        <div>0x4768589y79db23eSDFkj894c8B145  <CopyIcon /></div>

                    </div>
                    <Button variant="contained" className="btns animatebtn" >
                        Delegator
                    </Button>
                </div>
                <div className='listing_details'>
                    <ul>
                        {userData.map((user) => (
                            <li key={user.id}>
                                <p className='firstchild'>{user.status}</p>
                                <p>{user.value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Wrapper>
        </>
    );
};

export default Sherlock;


