<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 150px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 0px;
	color: white;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}

.topbar{
    display: flex;
	width: 100%;
	height: 70px;
	justify-content: space-between;
	align-items: center;
}
.topbar_tab1{
	margin-left: 15px;
}
.topbar_tab2{
	width: 70%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.topbar_tab2_qr{
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}


</style>
<template>
    <div class="layout">
        <Layout>
            <Header style="background: black;">
                <Menu mode="horizontal" theme="dark" style="background: black;" active-name="1">
					<Input class="layout-logo" search placeholder="输入关键字" />
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            上传
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            API
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Github
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            帮助与支持
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                微信小游戏
                            </template>
                            <MenuItem name="3-1" to="/games/share/web-mobile/index.html">分享</MenuItem>
                            <MenuItem name="3-2">开放数据域</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 0px 10px'}">
					<div class="topbar">
						<Breadcrumb class="topbar_tab1">
							<BreadcrumbItem to="/"><Icon type="ios-home-outline"></Icon> Home</BreadcrumbItem>
							<BreadcrumbItem><Icon type="ios-cafe"></Icon> Breadcrumb</BreadcrumbItem>
						</Breadcrumb>
						<div class="topbar_tab2">
							<Button type="primary" shape="circle" icon="ios-cloud-download-outline" style="margin-right: 10px;">下载</Button>
							<Button type="primary" shape="circle" icon="md-copy" >复制</Button>
							<div class="topbar_tab2_qr">
								<Button type="dashed"><Icon type="md-qr-scanner" /> 二维码</Button>
							</div>
						</div>
					</div>
                    
                    <Content :style="{padding: '4px', minHeight: '280px', background: '#fff'}">
                        <Row :gutter="16">
                            <Col span="16">
                                <MonacoEditor style="margin-left: 0px;"
                                    height="600"
                                    language="typescript"
                                    theme="vs"
                                    :code="code"
                                    :editorOptions="options"
                                    @mounted="onMounted"
                                    @codeChange="onCodeChange">
                                </MonacoEditor>
                            </Col>
                            
                            <Col span="8">
                                <div>col-8</div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
                
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import MonacoEditor from 'vue-monaco-editor'
    export default {
        components: {
            MonacoEditor
        },
        data () {
            return {
                code: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                options: {
                    selectOnLineNumbers: false
                }
            }
        },
        methods: {
            onMounted(editor) {
            this.editor = editor;
            },
            onCodeChange(editor) {
            console.log(this.editor.getValue());
            }
        }
    }


</script>
