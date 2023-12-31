import { ChangeEvent, useEffect, useState } from "react";
import { ContactData } from "./Popup";
import Papa from "papaparse";

const allowedExtensions = ["csv"];

const SelectFileButton = ({ setContacts }: { setContacts: (value: ContactData[]) => void }) => {

    const parseCSV = (file: File, callback: (result: Papa.ParseResult<string[]>) => void) => {
        const reader = new FileReader();
      
        reader.onload = (e) => {
          if (e.target !== null && e.target.result !== null) {
            // Parse CSV string using Papa.parse
            const csvString = e.target.result.toString();
            const result = Papa.parse(csvString);
            // if (result?.errors.length) {
            //     setError(result.errors[0]?.message)
            // }
            callback(result);
          }
        };
      
        reader.readAsText(file);
      };

      const [csvData, setCSVData] = useState<Papa.ParseResult<string[]>>();
      const [error, setError] = useState<string>('')

      const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileExtension = file?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            if (file) {
              parseCSV(file, (result) => {
                setCSVData(result);
              });
            }
        }
      };

      useEffect(() => {
        if (error) setContacts([])
        if (csvData?.data) {
          const data = csvData.data
          data.shift()
             setContacts(csvData.data.map((value) => {
              const name = (value[36] ?? '') + ' ' + (value[37] ?? '')
                return {
                    name: name,
                    phoneNumber: `+1 ${value[38]}`
                }
             }))
        }
      }, [csvData, error])

    return <div className="flex w-full items-center justify-center bg-grey-lighter">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:text-blue-500">
            {csvData ? <span className="mt-2 text-base leading-normal">{`${csvData.data.length} Contacts loaded`}</span> : <><svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input type='file' className="hidden" onChange={handleFileInputChange}/>
            </>}
        </label>
    </div>
}

export default SelectFileButton;