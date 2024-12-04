import { useEffect, useState } from "react";
import DocumentAside from "../../components/document/DocumentAside";
import { useAuthStore } from "../../store/useAuthStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";
import { useLocation } from "react-router-dom";

export default function DocumentLayout({children, isDetailVisible , selectedFolder}){


    return (<>
        <div id='document-container1'>
            <DocumentAside />
            <section className={`document-main1 ${isDetailVisible ? 'reduced' : ''}`}>
                {children}
            </section>
            {isDetailVisible && selectedFolder && (
                <section className='document-detail'>
                    <h2>{selectedFolder.name}</h2>
                    <p>ID: {selectedFolder.id}</p>
                    <p>Path: {selectedFolder.path}</p>
                    <p>File Count: {selectedFolder.fileCount}</p>
                    {/* 추가적인 폴더 정보 표시 */}
                </section>
            )}
        </div>
    </>);
}