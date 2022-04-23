// src/DisplayMapClass.js
import { notification } from 'antd';
import * as React from 'react';
import WrapperTranslate from '../WrapperTranslate/WrapperTranslate';
import {
  Container,
  Map,
  Controll,
  SearchBox,
  Title,
  Input,
  ListResult,
  CurrentResult,
  Item,
  ContainerResult,
  ContainerSearch,
} from './styled';
class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null,
    textSearch: '',
    service: null,
    searchResult: [],
    currentAddress: null,
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: 'YG4udLo3VPNVG8fDAmwoXhs1JEDbsKPCyizbDvjIYQc',
    });
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    const service = platform.getSearchService();

    this.setState({ map, service, behavior });
    // this.renderMarker(map, behavior);
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }
  renderMarker = (map, behavior, coords) => {
    const { currentMarker, service } = this.state;
    if (currentMarker) {
      map.removeObject(currentMarker);
    }
    const H = window.H;
    const svgMarkup =
      '<svg width="24" height="24" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
      'height="22" /><text x="12" y="18" font-size="12pt" ' +
      'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
      'fill="white">H</text></svg>';
    const icon = new window.H.map.Icon(svgMarkup);
    coords = coords ? coords : { lat: 52.53075, lng: 13.3851 };
    const marker = new window.H.map.Marker(coords, {
      // icon: icon,
      volatility: true,
    });
    marker.draggable = true;

    map.addObject(marker);
    map.setCenter(coords);
    map.setZoom(14);
    this.setState(() => ({ currentMarker: marker }));
    marker.addEventListener('tap', (evt) => {
      console.log(`${evt.type},@ + ${evt.target.getGeometry()}`);
      console.log(evt.target.getGeometry());
      console.log(evt.target);
    });
    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener(
      'dragstart',
      function (ev) {
        var target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          var targetPosition = map.geoToScreen(target.getGeometry());

          target['offset'] = new H.math.Point(
            pointer.viewportX - targetPosition.x,
            pointer.viewportY - targetPosition.y
          );
          behavior.disable();
        }
      },
      false
    );

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    const updateAddressOnState = (adress) => {
      this.setState(() => ({ currentAddress: adress }));
    };
    map.addEventListener(
      'dragend',
      (ev) => {
        const target = ev.target;
        if (target instanceof H.map.Marker) {
          const targetPosition = target.getGeometry();
          service.reverseGeocode(
            {
              // at: '106.6462118714261,10.766158845922476',
              // at: '10.766158845922476,106.6462118714261',
              at: `${targetPosition.lat},${targetPosition.lng}`,
            },
            (result) => {
              const item = result.items[0];
              if (!result?.items[0]) {
                notification.error({
                  message: 'Lỗi',
                  description: 'Xin cung cấp địa chỉ chi tiết hơn',
                });
                return;
              }
              const { title = 'missing', id = 'missing' } = result.items?.[0];
              // updateAddressOnState(result.items[0]?.title);
              const { addressNo, city } = this.convertAddress(item);
              const currentAddress = {
                addressNo,
                city,
                locationId: id,
                ...targetPosition,
              };
              this.props.chooseLocation(currentAddress);
              this.setState(() => ({
                currentAddress,
              }));
            }
          );
          behavior.enable();
        }
      },
      false
    );

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener(
      'drag',
      function (ev) {
        var target = ev.target,
          pointer = ev.currentPointer;
        if (target instanceof H.map.Marker) {
          target.setGeometry(
            map.screenToGeo(
              pointer.viewportX - target['offset'].x,
              pointer.viewportY - target['offset'].y
            )
          );
        }
      },
      false
    );
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ textSearch: value }));
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      const { service, textSearch } = this.state;
      if (!service) {
        return console.log('could not search, because service is null');
      }
      service.geocode(
        {
          q: textSearch,
        },
        (result) => {
          this.setState(() => ({
            searchResult: result.items,
          }));
        }
      );
    }
  };
  renderSearchResult = () => {
    const { searchResult, currentAddress } = this.state;
    return searchResult.map((item) => {
      return (
        <Item
          className={
            currentAddress && currentAddress.locationId === item.id && 'active'
          }
          onClick={() => {
            this.handleChoosePlace(item);
          }}
          key={item.id}
        >
          {item.title}
        </Item>
      );
    });
  };
  convertAddress = ({ address = {} }) => {
    const { houseNumber, street, district, city, countryName, county } =
      address;
    let res = '';
    try {
      if (houseNumber) {
        res += `${houseNumber}/`;
      }
      if (!street) {
        throw new Error('Missing street');
      }
      // res += `${res.slice(-1) === '/' ? street : `/${street}`}`;
      res += `${street}`;
      if (district) {
        res += `${res.slice(-1) === '/' ? district : `/${district}`}`;
      }

      if (city) {
        res += `${res.slice(-1) === '/' ? city : `/${city}`}`;
      }
      if (!county) {
        throw new Error('Missing city');
      }
      res += `${res.slice(-1) === '/' ? county : `/${county}`}`;
      if (!countryName) {
        throw new Error('Missing city');
      }
      res += `${res.slice(-1) === '/' ? countryName : `/${countryName}`}`;
      return { addressNo: res, city: county };
    } catch (e) {
      // console.log(e.message);
      notification.error({
        message: 'Lỗi',
        description: 'Xin cung cấp địa chỉ chi tiết hơn',
      });
      return false;
    }
  };
  handleChoosePlace = (item) => {
    const { map, behavior } = this.state;
    const coords = item.position;
    this.renderMarker(map, behavior, coords);
    const data = this.convertAddress(item);
    if (data) {
      const { addressNo, city } = data;
      const currentAddress = {
        addressNo,
        city,
        ...item.position,
        locationId: item.id,
      };
      this.setState(() => ({
        currentAddress,
      }));
      this.props.chooseLocation(currentAddress);
    }
  };

  render() {
    const { textSearch, currentAddress, searchResult } = this.state;
    const { t } = this.props;
    return (
      // Set a height on the map so it will display
      <Container>
        <Map ref={this.mapRef}></Map>
        <Controll>
          <ContainerSearch>
            <SearchBox className="search__box">
              <Title>{t('checkoutpage.enterAddress')}:</Title>
              <Input
                onChange={this.handleChange}
                value={textSearch}
                onKeyDown={this.onKeyDown}
              />
            </SearchBox>

            <Title>
              {t('checkoutpage.found')} {searchResult.length}{' '}
              {t('checkoutpage.result')}
            </Title>
            <ListResult>{this.renderSearchResult()}</ListResult>
          </ContainerSearch>
          <ContainerResult>
            <CurrentResult>
              <p>
                {this.props.textResult
                  ? this.props.textResult
                  : `${t('checkoutpage.destination')}:`}
              </p>
              <p>{currentAddress && currentAddress.addressNo}</p>
            </CurrentResult>
          </ContainerResult>
        </Controll>
      </Container>
    );
  }
}

export default WrapperTranslate(DisplayMapClass);
