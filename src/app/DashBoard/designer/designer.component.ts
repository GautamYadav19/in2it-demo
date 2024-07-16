import {
  Component,
  EventEmitter,
  Inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css'],
})
export class DesignerComponent   {
   root!: am5.Root;
  chartInitiated: boolean = false;
  myevent = new EventEmitter<any>();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
        this.myevent.emit(this.newArray);
      });
    }
  }

  ngAfterViewInit() {
    this.barchart();
    this.salechart();
    this.funnelFn();
    this.certainityFn();
    this.pieChart();
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
  Sales_request_per_variant = [
    {
      name: 'Bronze',
      count: 18,
    },
    {
      name: 'Gold',
      count: 48,
    },
    {
      name: 'Silver',
      count: 94,
    },
    {
      name: 'Best Effort',
      count: 27,
    },
    {
      name: 'Platinum',
      count: 4,
    },
  ];
  certainity = [
    {
      name: 'High',
      value: 32,
    },
    {
      name: 'Moderate',
      value: 47,
    },
    {
      name: 'Low',
      value: 28,
    },
    {
      name: 'Extremly High',
      value: 10,
    },
    {
      name: 'Almost Lost',
      value: 2,
    },
  ];
  source_graph = [
    {
      sourceName: 'Direct',
      value: 309,
    },
    {
      sourceName: 'Cross Sales',
      value: 97,
    },
    {
      sourceName: 'Portal Enquiry',
      value: 7,
    },
  ];
  sales_ticket_per_owner = [
    {
      user_name: 'Tinku Sharma',
      total_ticket: 89,
    },
    {
      user_name: 'Vishal Mishra',
      total_ticket: 3,
    },
    {
      user_name: 'Pawna Kumare',
      total_ticket: 19,
    },
    {
      user_name: 'Shivank Tyagi',
      total_ticket: 36,
    },
    {
      user_name: 'Vikash Tiwari123',
      total_ticket: 6,
    },
    {
      user_name: 'Vikash Tiwari',
      total_ticket: 5,
    },
 
  ];
  sales_funnel = [
    {
      name: 'Lead',
      count: 413,
      percentage: '27%',
    },
    {
      name: 'Opportunity',
      count: 113,
      percentage: '76%',
    },
    {
      name: 'Quotation',
      count: 86,
      percentage: '58%',
    },
    {
      name: 'Order',
      count: 50,
      percentage: '0%',
    },
  ];

  initializeArray(existingArray: any) {
    return existingArray.slice(0, 4);
  }
  newArray: any = this.initializeArray(this.sales_ticket_per_owner);

  count: number = this.newArray.length;
  addElement(newArray: any, existingArray: any) {
    if (this.count < existingArray.length) {
      newArray.push(existingArray[this.count++]);
      newArray.shift();
    }
    return newArray;
  }
  backElement(newArray: any, existingArray: any) {
    this.count--;
    if (this.count < existingArray.length && this.count > 3) {
      newArray.unshift(existingArray[this.count - 4]);
      newArray.pop();
    }
    return newArray;
  }

  add() {
    this.newArray = this.addElement(this.newArray, this.sales_ticket_per_owner);
    this.myevent.emit(this.newArray);
    console.log(this.newArray);
  }
  back() {
    this.newArray = this.backElement(
      this.newArray,
      this.sales_ticket_per_owner
    );
    this.myevent.emit(this.newArray);

    console.log(this.newArray);
  }
  barchart() {
    this.browserOnly(() => {
      let root = am5.Root.new('chartdiv');
      if (this.root) {
        root.dispose();
      }
      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          layout: root.verticalLayout,
        })
      );
      root._logo?.dispose();
      chart.children.unshift(
        am5.Label.new(root, {
          text: 'Sales Tickets Per Owner',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          x: am5.percent(50),
          centerX: am5.percent(50),
          paddingTop: 0,
          paddingBottom: 0,
        })
      );
      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
          visible: false,
          
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: 'user_name',
          
        })
      );
      this.myevent.subscribe((data) => {
        xAxis.data.setAll(data);
      });

      yAxis.get('renderer').grid.template.setAll({
        visible: false,
      });
      xAxis.get('renderer').grid.template.setAll({
        visible: false,
      });
      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: 'Series',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'total_ticket',
          categoryXField: 'user_name',
          
        })
      );
      this.myevent.subscribe((data) => {
        series1.data.setAll(data);
      });
      series1.columns.template.setAll({ width: 30 });
      this.root = root;
    });
    this.chartInitiated = true;
  }
  pieChart() {
    this.browserOnly(() => {
      this.root = am5.Root.new('piechart');
      this.root._logo?.dispose();

      this.root.setThemes([am5themes_Animated.new(this.root)]);
      const chart = this.root.container.children.push(
        am5percent.PieChart.new(this.root, {
          radius: am5.percent(90),
          innerRadius: am5.percent(50),
          layout: this.root.verticalLayout,
        })
      );
      chart.children.unshift(
        am5.Label.new(this.root, {
          text: 'Via Source',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          x: am5.percent(50),
          centerX: am5.percent(50),
          paddingTop: 0,
          paddingBottom: 0,
        })
      );
      var series = chart.series.push(
        am5percent.PieSeries.new(this.root, {
          name: 'Series',
          valueField: 'value',
          categoryField: 'sourceName',
          centerX: am5.percent(50),
          radius: am5.percent(50),
          x: am5.percent(50),
          y: am5.percent(10),
          legendValueText: '',
        })
      );
      series.data.setAll(this.source_graph);

      series.slices.template.set('toggleKey', 'none');
      series.labels.template.set('visible', false);
      series.ticks.template.set('visible', false);

      let legend = chart.children.push(
        am5.Legend.new(this.root, {
          name: 'sourceName',
          centerX: am5.percent(0),
          x: am5.percent(0),
          y: am5.percent(10),
          layout: this.root.horizontalLayout,
        })
      );

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
      });
      legend.labels.template.setAll({
        marginRight: -50,
      });

      legend.data.setAll(series.dataItems);
    });
  }
  certainityFn() {
    this.browserOnly(() => {
      let root = am5.Root.new('certainity');
      let color = ['#003366', '#336699', '#6699CC', '#99CCFF', '#CCE6FF'];
      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          paddingLeft: 0,
          layout: root.verticalLayout,
        })
      );
      root._logo?.dispose();
      chart.children.unshift(
        am5.Label.new(root, {
          text: 'Certainity',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          x: am5.percent(50),
          centerX: am5.percent(50),
          paddingTop: 0,
          paddingBottom: 0,
        })
      );
      // chart.bottomAxesContainer.set('layout', root.horizontalLayout);

      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'name',
          renderer: am5xy.AxisRendererY.new(root, {
            minGridDistance: 25,
          }),
          visible: false,

          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      yAxis.data.setAll(this.certainity);

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          visible: false,
        })
      );

      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: 'value',
          categoryYField: 'name',
          fill: am5.color('#f00'),
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueX}',
          }),
        })
      );
      series1.columns.template.adapters.add('fill', function (fill, target) {
        return chart.get('colors')?.getIndex(series1.columns.indexOf(target));
      });
      // series1.columns.template.setAll({height:60})
      yAxis.get('renderer').grid.template.setAll({
        visible: false,
      });
      xAxis.get('renderer').grid.template.setAll({
        visible: false,
      });

      series1.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: '{valueX}',
            populateText: true,
          }),
        });
      });
// series1.columns.template.setAll({:0})
      series1.data.setAll(this.certainity);

      let legend = chart.children.push(
        am5.Legend.new(root, {
          nameField: 'categoryY',
          layout:root.gridLayout,
        
        })
      );
      legend.data.setAll(series1.dataItems);

      series1.appear();
    });
  }
  funnelFn() {
    this.browserOnly(() => {
      var root = am5.Root.new('funnelChart');
      root._logo?.dispose();
      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(
        am5percent.SlicedChart.new(root, {
          layout: root.horizontalLayout,
        })
      );
      chart.children.unshift(
        am5.Label.new(root, {
          text: 'Sales Funnel',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          x: am5.percent(50),
          centerX: am5.percent(50),
        })
      );
      var series = chart.series.push(
        am5percent.FunnelSeries.new(root, {
          name: 'Series',
          valueField: 'count',
          categoryField: 'name',
          legendLabelText: '{percentage}',
          legendValueText: '',
          orientation: 'vertical',
          alignLabels: false,
          bottomRatio: 0.1,
          width: 180,
          height: 290,
          marginLeft: 70,
          centerX: 50,
          x: am5.percent(70),
          y: am5.percent(10),
        })
      );
      series.data.setAll(this.sales_funnel);
      series.labels.template.set('text', '{count}');
      series.slices.template.set('tooltipText', '{name}: [bold]{count}[/]');
      var legend1 = chart.children.push(
        am5.Legend.new(root, {
          nameField: 'category',

          layout: root.verticalLayout,
          y: am5.percent(55),
          x: 12,
          centerY: am5.percent(50),
        })
      );

      var legend2 = chart.children.push(
        am5.Legend.new(root, {
          layout: root.verticalLayout,
          y: am5.percent(30),
          x: 300,

          centerX: am5.percent(40),
        })
      );
      legend1.data.setAll(series.dataItems);
      legend1.labels.template.set('paddingBottom', 15);
      legend1.markers.template.setAll({
        width: 0,
        height: 0,
      });
      legend2.labels.template.set('paddingBottom', 15);

      legend2.data.setAll(series.dataItems);
      legend2.markers.template.setAll({
        width: 0,
        height: 0,
      });
    });
  }
  salechart() {
    this.browserOnly(() => {
      let root = am5.Root.new('salechart');
      root._logo?.dispose();

      root.setThemes([am5themes_Animated.new(root)]);
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          radius: am5.percent(100),
          innerRadius: am5.percent(40),
          x: am5.percent(-20),
          y: am5.percent(1),
        })
      );
      chart.children.unshift(
        am5.Label.new(root, {
          text: 'Sales Request Per Variant',
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          x: am5.percent(70),
          centerX: am5.percent(50),
          paddingTop: 0,
          paddingBottom: 0,
        })
      );
      var series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: 'Series',
          valueField: 'count',
          categoryField: 'name',
          centerX: am5.percent(50),
          radius: am5.percent(50),
          x: am5.percent(50),
          y: am5.percent(1),
          legendValueText: '{count}',
        })
      );
      series.data.setAll(this.Sales_request_per_variant);

      series.labels.template.set('visible', false);
      series.ticks.template.set('visible', false);
      series.slices.template.set('toggleKey', 'none');

      let legend = chart.children.push(
        am5.Legend.new(root, {
          name: 'sourceName',
          centerX: am5.percent(50),
          x: am5.percent(100),
          y: am5.percent(20),
          layout: root.verticalLayout,
        })
      );
      legend.labels.template.setAll({
        text: '{sourceName}',
      });
      legend.data.setAll(series.dataItems);
      // legend.data.setAll(chart.series.values);
    });
  }
}
