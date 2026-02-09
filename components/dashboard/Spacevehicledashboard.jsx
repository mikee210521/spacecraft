'use client';

import { useState } from 'react';
import styles from 'components/styles/register.module.css';
import vehiclesData from 'data/spaceDashboard.json';

export default function SpaceVehicleDashboard() {
    const [vehicles, setVehicles] = useState(vehiclesData);
    const [isRecording] = useState(true);
    const [showVehicles, setShowVehicles] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(
        vehiclesData.length ? vehiclesData[0].id : null
    );

    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

    const { telemetry, checklistItems, connections, name } = selectedVehicle;

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.header}>
                <h1 className={styles.main_title}>VEHICLE OVERVIEW</h1>
                <div className={styles.subtitle}>{name}</div>
            </div>

            <div className={styles.main_grid}>
                <div className={styles.checklist_panel}>
                    {checklistItems.map(item => (
                        <div
                            key={item.id}
                            className={`${styles.checklist_item} 
                                ${item.highlight ? styles.highlight : ''} 
                                ${item.warning ? styles.warning : ''}`}
                        >
                            <div
                                className={`${styles.check_icon} 
                                ${item.checked
                                    ? item.highlight
                                        ? styles.active
                                        : styles.checked
                                    : styles.pending}`}
                            >
                                {item.checked ? '✓' : '○'}
                            </div>
                            <div className={styles.checklist_content}>
                                <div className={styles.checklist_name}>{item.name}</div>
                                <div className={styles.checklist_status}>{item.status}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.center_panel}>
                    <div className={styles.metrics_grid}>
                        <Metric label="PPO2" value={telemetry.ppo2} unit="psia" />
                        <Metric label="CABIN TEMP" value={telemetry.cabinTemp} unit="°C" />
                        <Metric label="CABIN PRESSURE" value={telemetry.cabinPressure} unit="psia" />
                        <Metric label="CO2" value={telemetry.co2} unit="mmHg" />
                    </div>

                    <div className={styles.vehicle_display}>
                        <div className={styles.orbit_ring}></div>
                        <div className={styles.orbit_ring}></div>

                        <div className={styles.capsule_container}>
                            <img
                                src={selectedVehicle.image}
                                alt={selectedVehicle.name}
                                className={styles.img_spaceVehicle}
                            />
                        </div>

                        {isRecording && (
                            <div className={styles.recording_indicator}>
                                <div className={styles.recording_dot}></div>
                                <span className={styles.recording_text}>
                                    CABIN MICS RECORDING
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={styles.checklist_panel}>
                        <div className={styles.metric_label} style={{ marginBottom: '1rem' }}>
                            CONNECTIONS
                        </div>
                        <div className={styles.connections_list}>
                            {connections.map((conn, idx) => (
                                <div key={idx} className={styles.connection_item}>
                                    <span className={styles.connection_name}>{conn.name}</span>
                                    <span className={styles.connection_status}>{conn.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.info_panel}>
                    <Stat label="Inertial Velocity" value={`${telemetry.inertialVelocity} km/s`} />
                    <Stat label="Altitude" value={`${telemetry.altitude} km`} />
                    <Stat label="Apogee" value={`${telemetry.apogee} km`} />
                    <Stat label="Perigee" value={`${telemetry.perigee} km`} />
                    <Stat label="Inclination" value={`${telemetry.inclination}°`} />
                    <Stat label="Range to ISS" value={`${telemetry.rangeToISS} km`} />

                    <div className={styles.checklist_panel}>
                        <div className={styles.metric_label}>NET POWER</div>
                        <div className={styles.stat_item}>
                            NET PWR 1: {telemetry.netPwr1} W
                        </div>
                        <div className={styles.stat_item}>
                            NET PWR 2: {telemetry.netPwr2} W
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.action_buttons_wrapper}>
                <div className={styles.action_buttons_container}>
                    <button
                        className={`${styles.btn} ${styles.btn_primary}`}
                        onClick={() => setShowVehicles(!showVehicles)}
                    >
                        Show all vehicles
                    </button>
                    <button className={`${styles.btn} ${styles.btn_secondary}`}>
                        Search
                    </button>
                </div>

                {showVehicles && (
                    <div className={styles.vehicle_dropdown}>
                        {vehicles.map(vehicle => (
                            <div
                                key={vehicle.id}
                                className={`${styles.vehicle_dropdown_item} ${selectedVehicleId === vehicle.id ? styles.selectedVehicle : ''}`}
                                onClick={() => {
                                    setSelectedVehicleId(vehicle.id);
                                    setShowVehicles(false);
                                }}
                            >
                                {vehicle.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
}

function Metric({ label, value, unit }) {
    return (
        <div className={styles.metric_card}>
            <div className={styles.metric_label}>{label}</div>
            <div className={styles.metric_value}>
                {value} <span className={styles.metric_unit}>{unit}</span>
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className={styles.stat_item}>
            <span className={styles.stat_label}>{label}</span>
            <span className={styles.stat_value}>{value}</span>
        </div>
    );
}
