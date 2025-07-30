import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Index() {
  const [reports, setReports] = useState([
    { id: 1, title: 'Отчет о продажах Q1', author: 'Иван Петров', status: 'pending', date: '2025-01-28', content: 'Анализ продаж за первый квартал показал рост на 15%' },
    { id: 2, title: 'Техническое обслуживание', author: 'Анна Смирнова', status: 'approved', date: '2025-01-27', content: 'Выполнено плановое техническое обслуживание серверов' },
    { id: 3, title: 'Отчет по маркетингу', author: 'Михаил Козлов', status: 'pending', date: '2025-01-26', content: 'Результаты рекламной кампании в социальных сетях' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Новая система отчетности запущена', type: 'info', date: '2025-01-29' },
    { id: 2, message: 'Плановое обслуживание завтра в 14:00', type: 'warning', date: '2025-01-28' },
    { id: 3, message: 'Отчеты за январь нужно подать до 31 числа', type: 'important', date: '2025-01-27' }
  ]);

  const [newReport, setNewReport] = useState({ title: '', content: '' });
  const [newNotification, setNewNotification] = useState({ message: '', type: 'info' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitReport = () => {
    if (newReport.title.trim() && newReport.content.trim()) {
      const report = {
        id: Date.now(),
        title: newReport.title,
        author: 'Текущий пользователь',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        content: newReport.content
      };
      setReports([report, ...reports]);
      setNewReport({ title: '', content: '' });
      setIsDialogOpen(false);
    }
  };

  const handleApproveReport = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: 'approved' } : report
    ));
  };

  const handleRejectReport = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: 'rejected' } : report
    ));
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const handleSendNotification = () => {
    if (newNotification.message.trim()) {
      const notification = {
        id: Date.now(),
        message: newNotification.message,
        type: newNotification.type,
        date: new Date().toISOString().split('T')[0]
      };
      setNotifications([notification, ...notifications]);
      setNewNotification({ message: '', type: 'info' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'rejected': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Утвержден';
      case 'pending': return 'На рассмотрении';
      case 'rejected': return 'Отклонен';
      default: return status;
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'important': return 'bg-red-50 border-red-200 border-l-red-500';
      case 'warning': return 'bg-amber-50 border-amber-200 border-l-amber-500';
      case 'info': return 'bg-blue-50 border-blue-200 border-l-blue-500';
      default: return 'bg-gray-50 border-gray-200 border-l-gray-500';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'important': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="FileText" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Корпоративная система отчетов
                </h1>
                <p className="text-sm text-gray-600">Управление отчетами и уведомлениями</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Система активна</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <Icon name="User" className="text-white" size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Всего отчетов</p>
                  <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon name="FileText" className="text-blue-600" size={26} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">На рассмотрении</p>
                  <p className="text-3xl font-bold text-amber-600">{reports.filter(r => r.status === 'pending').length}</p>
                </div>
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon name="Clock" className="text-amber-600" size={26} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Утверждено</p>
                  <p className="text-3xl font-bold text-emerald-600">{reports.filter(r => r.status === 'approved').length}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon name="CheckCircle" className="text-emerald-600" size={26} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Уведомления</p>
                  <p className="text-3xl font-bold text-purple-600">{notifications.length}</p>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon name="Bell" className="text-purple-600" size={26} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white p-2 rounded-xl shadow-lg">
            <TabsTrigger value="reports" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3">
              <Icon name="FileText" size={18} />
              <span className="font-medium">Отчеты сотрудников</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3">
              <Icon name="Bell" size={18} />
              <span className="font-medium">Уведомления</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3">
              <Icon name="Shield" size={18} />
              <span className="font-medium">Администрирование</span>
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Отчеты сотрудников</h2>
                <p className="text-gray-600 mt-1">Подавайте отчеты и отслеживайте их статус</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать отчет
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Новый отчет</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-5 mt-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Заголовок отчета</label>
                      <Input
                        placeholder="Введите заголовок отчета"
                        value={newReport.title}
                        onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Содержание отчета</label>
                      <Textarea
                        placeholder="Опишите подробности отчета..."
                        rows={5}
                        value={newReport.content}
                        onChange={(e) => setNewReport({...newReport, content: e.target.value})}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button onClick={handleSubmitReport} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить отчет
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Автор: {report.author}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{report.content}</p>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{report.date}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={14} className="mr-1" />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Уведомления</h2>
                <p className="text-gray-600 mt-1">Важные сообщения от администрации</p>
              </div>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки уведомлений
              </Button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getNotificationStyle(notification.type)} shadow-md hover:shadow-lg transition-shadow duration-200`}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          <Icon name={getNotificationIcon(notification.type)} size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium leading-relaxed">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Icon name="Clock" size={12} className="mr-1" />
                            {notification.date}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Панель администратора</h2>
              <p className="text-gray-600 mt-1">Управление системой и отправка уведомлений</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Send Notification */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="Send" size={18} className="text-blue-600" />
                    </div>
                    <span>Отправить уведомление</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Текст уведомления</label>
                    <Textarea
                      placeholder="Введите текст уведомления для всех сотрудников..."
                      rows={4}
                      value={newNotification.message}
                      onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Тип уведомления</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                    >
                      <option value="info">💙 Информация</option>
                      <option value="warning">⚠️ Предупреждение</option>
                      <option value="important">🚨 Важное сообщение</option>
                    </select>
                  </div>
                  <Button onClick={handleSendNotification} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить всем сотрудникам
                  </Button>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Icon name="BarChart3" size={18} className="text-emerald-600" />
                    </div>
                    <span>Аналитика работы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Обработано отчетов</span>
                      <span className="text-sm font-bold text-emerald-600">75%</span>
                    </div>
                    <Progress value={75} className="h-3 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Активность сотрудников</span>
                      <span className="text-sm font-bold text-blue-600">89%</span>
                    </div>
                    <Progress value={89} className="h-3 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Своевременность подачи</span>
                      <span className="text-sm font-bold text-purple-600">92%</span>
                    </div>
                    <Progress value={92} className="h-3 bg-gray-200" />
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-gray-300 hover:bg-gray-50 py-3">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    Подробная аналитика
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Management Actions */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Settings" size={18} className="text-purple-600" />
                  </div>
                  <span>Инструменты управления</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300 group">
                    <Icon name="Users" size={28} className="group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-medium">Управление пользователями</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 hover:border-emerald-300 group">
                    <Icon name="FileText" size={28} className="group-hover:text-emerald-600 transition-colors" />
                    <span className="text-sm font-medium">Шаблоны отчетов</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300 group">
                    <Icon name="Download" size={28} className="group-hover:text-purple-600 transition-colors" />
                    <span className="text-sm font-medium">Экспорт данных</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}