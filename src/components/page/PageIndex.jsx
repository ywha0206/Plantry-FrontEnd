import React, { useState } from 'react'
import '@/pages/page/Page.scss'
import {CustomSearch} from '@/components/Search'
import {DocumentCard1} from '../../components/document/DocumentCard1';
import { DocumentCard2 } from '../../components/document/DocumentCard2';
import { Modal } from '../../components/Modal';
import { Link } from 'react-router-dom';
import PageAside from './PageAside';

export default function PageIndex(){

    return(<>
          <div id='page-container1'>
            <PageAside />
            <section className='page-main1 '>
                <section className="w-full bg-white">

                </section>
                
            </section>

        </div>
        
    </>);

}