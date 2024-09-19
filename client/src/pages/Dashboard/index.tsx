import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useApi } from '../../hooks/useApi';
import LineChartXR from '../../components/Dashboard/LineChartXR';
import BarChartXR from '../../components/Dashboard/BarChartXR';
import BarChartPositiveAndNegativeXR from '../../components/Dashboard/BarChartPositiveAndNegativeXR';
import PieChartXR from '../../components/Dashboard/PieChartXR';
import ResumeBalance from '../../components/Dashboard/ResumeBalance';
import LastSale from '../../components/Dashboard/LastSale';
import * as C from './styles';

const Dashboard = () => {
  const api = useApi();
  const auth = useContext(AuthContext);
  const [data, setData] = useState<any>(null); 
  const [targetDate, setTargetDate] = useState(7);

  const viewSalesAnalyticsRoles = ['Administration', 'Financial', 'Sales'];
  const viewProductsAnalyticsRoles = ['Administration', 'Sales', 'Deposit'];
  const viewFinancialAnalyticsRoles = ['Administration', 'Financial', 'Deposit'];
  const viewStoresAnalyticsRoles = ['Administration', 'Deposit'];

  const fetchData = async () => {
    const result = await api.getData(targetDate);

    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return (
    <C.Container>
      <C.Graphics>
        {data?.result && (
          <>
            {viewSalesAnalyticsRoles.includes(auth.user?.position ?? '') && (
              <C.ContainerSections>
                <C.TitleSections>
                  Orders / Transfers in the last
                  <C.BtnArea>
                    <button
                      className={targetDate === 7 ? 'active' : ''}
                      onClick={() => setTargetDate(7)}
                    >
                      07 days
                    </button>
                    <button
                      className={targetDate === 15 ? 'active' : ''}
                      onClick={() => setTargetDate(15)}
                    >
                      15 days
                    </button>
                    <button
                      className={targetDate === 30 ? 'active' : ''}
                      onClick={() => setTargetDate(30)}
                    >
                      30 days
                    </button>
                  </C.BtnArea>
                </C.TitleSections>
                <C.SalesArea>
                  <C.ResumeBalanceArea>
                    <ResumeBalance value={data.result?.sales?.profit ?? 0} type="Profit" />
                    <ResumeBalance value={data.result?.sales?.received ?? 0} type="Received" />
                  </C.ResumeBalanceArea>
                  <C.SalesDaily>
                    <LineChartXR
                      data={data.result?.sales?.list ?? []}
                      dataKeyLine="quantitySales"
                      nameLine="Sales"
                      dataKeyXAxis="date"
                    />
                  </C.SalesDaily>
                </C.SalesArea>
              </C.ContainerSections>
            )}

            {viewStoresAnalyticsRoles.includes(auth.user?.position ?? '') && (
              <C.ContainerSections>
                <C.TitleSections>
                  Profit by store type in the last
                  <C.BtnArea>
                    <button
                      className={targetDate === 7 ? 'active' : ''}
                      onClick={() => setTargetDate(7)}
                    >
                      07 days
                    </button>
                    <button
                      className={targetDate === 15 ? 'active' : ''}
                      onClick={() => setTargetDate(15)}
                    >
                      15 days
                    </button>
                    <button
                      className={targetDate === 30 ? 'active' : ''}
                      onClick={() => setTargetDate(30)}
                    >
                      30 days
                    </button>
                  </C.BtnArea>
                </C.TitleSections>
                <C.SalesArea>
                  <C.SalesDaily>
                    <PieChartXR
                      data={data.result?.stores?.profitByType ?? []}
                      dataKey="profit"
                      nameKey="type"
                    />
                  </C.SalesDaily>
                  <C.TableRanking>
                    <C.TableLine>
                      <tr>
                        <C.TableLineItem>Top stores</C.TableLineItem>
                      </tr>
                    </C.TableLine>
                    {data.result?.stores?.rankingByType?.map((store: any, index: number) => (
                      <C.TableContent key={index}>
                        <tr>
                          <C.TableContentItem>{store.name}</C.TableContentItem>
                          <C.TableContentItem>{store.type}</C.TableContentItem>
                          <C.TableContentItem>{store.profit}</C.TableContentItem>
                        </tr>
                      </C.TableContent>
                    ))}
                  </C.TableRanking>
                </C.SalesArea>
              </C.ContainerSections>
            )}

            {viewProductsAnalyticsRoles.includes(auth.user?.position ?? '') && (
              <C.ContainerSections>
                <C.TitleSections>Top 05 best-selling products</C.TitleSections>
                <BarChartXR
                  data={data.result?.products?.list ?? []}
                  dataKeyLine="sold_amount"
                  nameLine="Total sold"
                  dataKeyXAxis="name"
                />
                <C.AverageTicket>
                  <span>Average ticket: </span>
                  <strong>{data.result?.products?.averageTotalTicket ?? 'N/A'}</strong>
                </C.AverageTicket>
              </C.ContainerSections>
            )}

            {viewFinancialAnalyticsRoles.includes(auth.user?.position ?? '') && (
              <C.ContainerSections>
                <C.TitleSections>
                  Manual entries in the last
                  <C.BtnArea>
                    <button
                      className={targetDate === 7 ? 'active' : ''}
                      onClick={() => setTargetDate(7)}
                    >
                      07 days
                    </button>
                    <button
                      className={targetDate === 15 ? 'active' : ''}
                      onClick={() => setTargetDate(15)}
                    >
                      15 days
                    </button>
                    <button
                      className={targetDate === 30 ? 'active' : ''}
                      onClick={() => setTargetDate(30)}
                    >
                      30 days
                    </button>
                  </C.BtnArea>
                </C.TitleSections>
                <C.SalesArea>
                  <C.ResumeBalanceArea>
                    <ResumeBalance value={data.result?.financial?.difference ?? 0} type="Balance" />
                    <ResumeBalance value={data.result?.financial?.totalEntries ?? 0} type="Entry" />
                    <ResumeBalance value={data.result?.financial?.totalOutputs ?? 0} type="Exit" />
                  </C.ResumeBalanceArea>
                  <C.SalesDaily>
                    <BarChartPositiveAndNegativeXR
                      data={data.result?.financial?.list ?? []}
                      dataKeyPositive="positive"
                      datasKeyNegative="negative"
                      nameLinePositive="Entry"
                      nameLineNegative="Exit"
                      dataKeyXAxis="date"
                    />
                  </C.SalesDaily>
                </C.SalesArea>
              </C.ContainerSections>
            )}
          </>
        )}
      </C.Graphics>

      {viewSalesAnalyticsRoles.includes(auth.user?.position ?? '') && (
        <C.LastSalesArea>
          <C.TitleLastSales>Last Orders / Transfers</C.TitleLastSales>
          {data?.result?.sales?.lastSales?.length > 0 ? (
            <C.LastSalesAreaCards>
              {data.result?.sales?.lastSales.map((item: any, index: number) => (
                <LastSale
                  key={index}
                  price={item.price}
                  name={item.name}
                  unity={item.unity}
                  quantity={item.quantity}
                />
              ))}
            </C.LastSalesAreaCards>
          ) : (
            <p style={{ fontSize: '12px' }}>No records.</p>
          )}
        </C.LastSalesArea>
      )}
    </C.Container>
  );
};

export default Dashboard;
