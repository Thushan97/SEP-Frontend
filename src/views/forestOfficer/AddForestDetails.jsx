import '../../style/AddForestDetails.css';
import Topbar from './topbar';
import Sidebar from './sidebar';

export default function AddForestDetails() {
    return (
        <div>
            <Topbar/>
            <div className="containers">
                <Sidebar/>
                <div className="write">
                    <from className="writeForm">
                        <div className="writeFormGroup">
                            <h1>Galoya National Park</h1>
                            <label htmlFor="fileInput">
                                <i class="fas fa-plus-circle"></i>
                            </label>
                            <input type="file" id="fileInput"/>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    )
}
