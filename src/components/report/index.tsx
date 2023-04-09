import { DxReportDesigner } from 'devexpress-reporting/dx-reportdesigner';
import * as ko from 'knockout';
import { useEffect, useRef } from "react";

export function ReportDesigner() {
  const reportUrl = ko.observable("TestReport");
  const designerRef = useRef<HTMLDivElement>(null); // adicionado tipo para a referência
  const requestOptions = {
    host: "https://localhost:54114/",
    getDesignerModelAction: "DXXRD/GetDesignerModel"
  };
  useEffect(() => {
    if(!designerRef?.current) return; // verificação adicionada antes de usar a referência
    const designer = new DxReportDesigner(designerRef?.current , { reportUrl, requestOptions }); 
    designer.render(); 
    return () => designer.dispose();
  });
  return <div ref={designerRef}></div>;
}