import emailHtmlLayout from '@/templates/layout/emailHtmlLayout';


export interface EmailParams {
  htmlData: string
}

const emailHtml = ({ htmlData }: EmailParams) =>
  emailHtmlLayout(`<div>
    <div
            style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    ></div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td
                bgcolor="#ffffff"
                align="center"
                style="padding: 10px 15px 30px 15px"
                class="section-padding"
        >
          <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 500px"
                  class="responsive-table"
          >
            <tr>
              <td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                      >
                        <tr>
                          <td style="
                              padding: 0 0 0 0;
                              font-size: 16px;
                              line-height: 25px;
                              color: #232323;
                            "
                              class="padding message-content"
                          >
                            <h2>New Contact Message</h2>
                            <div class="form-container">${htmlData}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`);

export default emailHtml;