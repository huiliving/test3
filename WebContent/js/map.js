function mapInit() {
	//��ͼ��ʼ����������
    var opt = {
		center: new MMap.LngLat(116.397428, 39.90923),//���õ�ͼ���ĵ�
        level: 10,//��ʼ��ͼ���ż���
        zooms:[7,17]//��ͼ���ż���Χ
    };
    mapObj = new MMap.Map("iCenter", opt);
	
	//���ص�ͼ�����ؼ�
    mapObj.plugin(["MMap.ToolBar", "MMap.OverView", "MMap.Scale"],function() {
		//���ع��������������������������̡���߼��̺��Զ���λ����
        toolbar = new MMap.ToolBar();
        mapObj.addControl(toolbar);
		//����ӥ��
        overview = new MMap.OverView(); 
        mapObj.addControl(overview);
		//���ر�����
        scale = new MMap.Scale(); 
        mapObj.addControl(scale);
    });
}
