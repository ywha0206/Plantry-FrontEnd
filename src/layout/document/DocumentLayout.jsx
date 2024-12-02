import DocumentAside from "../../components/document/DocumentAside";

export default function DocumentLayout({children}){

    return (<>
        <div id='document-container1'>
            <DocumentAside />
            <section className='document-main1'>
                {children}
            </section>
        </div>
    </>);
}