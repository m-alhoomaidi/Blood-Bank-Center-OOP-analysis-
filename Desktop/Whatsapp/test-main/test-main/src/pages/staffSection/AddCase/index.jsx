import { useEffect, useState } from "react"

export function Addcase() {
  let [page, setPage] = useState(0)
  useEffect(() => window.scrollTo(0, 200), [page])

  return (
    <>
      <div className="case-container">
        <div className="date">الخميس, 27 - 01- 1444 هـ</div>
        <div className="page-title">اضافة قضية جديدة</div>
        <div className="top-bar">
          <div className="ecplipse">
            <div className={`inner-eclipse${page >= 3 ? ' active' : ''}`}>
              4
              <div className="tooltip">المرفقات</div>
            </div>
          </div>
          <div className="ecplipse">
            <div className={`inner-eclipse${page >= 2 ? ' active' : ''}`}>
              3
              <div className="tooltip">فريق العمل</div>

            </div>
          </div>
          <div className="ecplipse">
            <div className={`inner-eclipse${page >= 1 ? ' active' : ''}`}>
              2
              <div className="tooltip">مدير القضية</div>

            </div>
          </div>
          <div className="ecplipse">
            <div className={`inner-eclipse${page >= 0 ? ' active' : ''}`}>
              1
              <div className="tooltip">البيانات الاساسية</div>

            </div>
          </div>
        </div>
        {page === 0 && <>
          <div className="page-description" style={{ fontSize: 20 }}>البيانات الشخصية</div>
          <div className="form">
            <div className="flex-1">
              <label className="case-label"><span><span className="red">*</span> المدينة</span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> الخصوم </span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> نوع القضية </span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> الرقم</span>
                <label className="input">
                  <input type="text" placeholder="قم بادخال اسم القضية هنا" />
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> الدائرة القضائية</span>
                <label className="input">
                  <input type="text" placeholder="قم بادخال اسم القضية هنا" />
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> فئة القضية </span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
            </div>
            <div className="flex-1">
              <label className="case-label"><span><span className="red">*</span> اسم القضية</span>
                <label className="input">
                  <input type="text" placeholder="قم بادخال اسم القضية هنا" />
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> العملاء</span>
                <label className="input">
                  <input type="text" placeholder="قم بادخال اسم القضية هنا" />
                </label>
              </label>
              <label className="case-label"><span> تاريخ بداية القضية </span>
                <label className="input">
                  <input type="text" placeholder="قم بادخال اسم القضية هنا" />
                </label>
              </label>
              <label className="case-label"><span><span className="red">*</span> الفرع </span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
              <label className="case-label"><span>الصفة القانونية</span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
              <label className="case-label"><span>المحكمة</span>
                <label className="input">
                  <select type="text" placeholder="قم بادخال اسم القضية هنا">
                    <option value="mekkah">مكة المكرمة</option>
                  </select>
                </label>
              </label>
            </div>
          </div>
          <label className="case-label"><span> الوصف</span>
            <label className="input" style={{ width: "100%" }}>
              <textarea type="text" placeholder="قم بادخال اسم القضية هنا" />
            </label>
          </label>
          <label className="case-label"><span> موضوع الدعوى</span>
            <label className="input" style={{ width: "100%" }}>
              <textarea type="text" placeholder="قم بادخال اسم القضية هنا" />
            </label>
          </label>
          <div className="button-list">
            <button className="button" onClick={() => setPage(1)}>حفظ واستمرار</button>
          </div>
        </>}
        {page === 1 && <>
          <div className="form v2">
            <div className="flex-1">
              <br />
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>

            </div>
            <div className="flex-1">
              <div className="page-description" style={{ fontSize: 20 }}>اضافة مدير القضية</div>

              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
            </div>
          </div>
          <div className="button-list">
            <button className="button back" onClick={() => setPage(0)}>العودة</button>
            <button className="button" onClick={() => setPage(2)}>حفظ واستمرار</button>
          </div>
        </>}
        {page === 2 && <>
          <div className="form v2">
            <div className="flex-1">
              <br />
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>

            </div>
            <div className="flex-1">
              <div className="page-description" style={{ fontSize: 20 }}>اضافة فريق العمل على القضية </div>

              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
              <label>عبدالله بن فيصل بن عبدالله السبيعي <input type="checkbox" /></label>
            </div>
          </div>          <div className="button-list">
            <button className="button back" onClick={() => setPage(1)}>العودة</button>
            <button className="button" onClick={() => setPage(3)}>حفظ واستمرار</button>
          </div>
        </>}
        {page === 3 && <>
          <div className="page-description" style={{ fontSize: 20 }}>مرفقات القضية </div>
          <label className="case-label"><span><span className="red">*</span> الفرع </span>
            <label className="input">
              <input type="text" placeholder="اسم المرفق" disabled />
            </label>
          </label>
          <input type="file" />
        </>}
      </div>
    </>
  )
}